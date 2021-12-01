Doesn't take any arguments. Cycles through the number of days denoted, from today, backward.

```
let interval = 0;
while (interval < 25) {
  let d = new Date();
  let revisedDate = d.setDate(d.getDate() - interval);
  revisedDate = new Date(revisedDate).toISOString().slice(0, 10);
  console.log(revisedDate);
  interval++
}


// 2021-11-18
// 2021-11-17
// 2021-11-16
// 2021-11-15
// 2021-11-14
// 2021-11-13
// 2021-11-12
// 2021-11-11
// 2021-11-10
// 2021-11-09
// 2021-11-08
// 2021-11-07
// 2021-11-06
// 2021-11-05
// 2021-11-04
// 2021-11-03
// 2021-11-02
// 2021-11-01
// 2021-10-31
// 2021-10-30
// 2021-10-29
// 2021-10-28
// 2021-10-27
// 2021-10-26
// 2021-10-25
```
