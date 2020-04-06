const { PI, sin, sqrt, log, random } = Math;

var gauss_second = undefined;

export function rand_gauss({mu=0, std=1}={}) {
  if (gauss_second) {
    let tmp = gauss_second;
    gauss_second = undefined;
    return mu + std*tmp;
  } else {

    let r2;
    let x1;
    let x2;
    do {
      x1 = 2.0 * random() - 1.0;
      x2 = 2.0 * random() - 1.0;
      r2 = x1 * x1 + x2 * x2;
    } while (r2 >= 1.0 || r2 == 0.0);

    /* Polar method, a more efficient version of the Box-Muller approach. */
    let f = sqrt(-2.0 * log(r2) / r2);
    /* Keep for next call */
    gauss_second = f * x1;
    return mu + std * f * x2;
  }
}