---
title: pytorch dataloader 多进程 与 fsspec 的问题
date: "2022-04-02T17:31:03.453Z"
description: "pytorch dataloader"
---

```python
import torch
from torch import multiprocessing
from torch.utils.data import DataLoader, IterableDataset

from data_processing.support import envs
from data_processing.support.data_definition import locations
from data_processing.support.util import timeutil

multiprocessing.set_start_method("spawn", force=True)


class MyIterableDataset(IterableDataset):
    def __init__(self, business, table, partitions):

        self.location = locations.get_location(
            business, table, partitions, just_for_write=False
        )
        self.all_files = self.location.get_files()
        self.all_files.sort()

        self.file = None
        self.cur_work_files = None

    def __iter__(self):
        return self

    def __next__(self):
        if self.cur_work_files is None:
            worker_info = torch.utils.data.get_worker_info()
            if worker_info is not None:
                self.cur_work_files = iter(
                    self.all_files[
                        worker_info.id : len(self.all_files) : worker_info.num_workers
                    ]
                )
        if self.file is None:
            self.file = next(self.cur_work_files)
            self.fr = self.location.open_custom_file_for_read(self.file).open()
        data = self.fr.readline()
        if data != "":
            return data
        else:
            self.fr.close()
            self.file = None
            return self.__next__()


def get_data_reader():
    train_data_business = "abcd"
    train_data_table = "efg"
    date = timeutil.str_to_date("2022-03-30")

    dataset = MyIterableDataset(train_data_business, train_data_table, [date, "train"])

    # data_loader = DataLoader(dataset, batch_size=5, num_workers=1, worker_init_fn=worker_init_fn)
    data_loader = DataLoader(dataset, batch_size=5, num_workers=8)

    for data in data_loader:
        print(data)


if __name__ == "__main__":
    envs.set_env(envs.TEST_ENV)
    envs.set_cloud(envs.TENCENT)
    get_data_reader()

```
