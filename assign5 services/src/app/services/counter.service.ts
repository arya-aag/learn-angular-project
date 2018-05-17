export class CounterService {
  private counts = { a2i: 0, i2a: 0 };

  getCounts() {
    return this.counts;
  }

  increaseI2A() {
    this.counts.a2i++;
  }

  increaseA2I() {
    this.counts.i2a++;
  }
}
