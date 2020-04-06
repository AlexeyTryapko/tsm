const { PI, sin, cos} = Math;


export function calc_factorials(N,call){
  let arr = [call(0)];
  for(let n=1;n<N;n++){
    let gain = arr[n-1];
    for(let i=call(n-1) + 1;i<=call(n);i++)
      gain *= i;
    arr.push(gain);
  }
  return arr;
}

/**
 * Return the number of bits used in the binary representation of the number.
 *
 * @param {number} number
 * @return {number}
 */
export function bitLength(number) {
    let bitsCounter = 0;

    while (1 << bitsCounter <= number) {
        bitsCounter += 1;
    }

    return bitsCounter;
}

/**
 * @param {number} radian
 * @return {number}
 */
export function radianToDegree(radian) {
    return radian * (180 / Math.PI);
}

export class ComplexNumber {
    /**
     * z = re + im * i
     * z = radius * e^(i * phase)
     *
     * @param {number} [re]
     * @param {number} [im]
     */
    constructor({ re = 0, im = 0 } = {}) {
        this.re = re;
        this.im = im;
    }

    /**
     * @param {ComplexNumber|number} addend
     * @return {ComplexNumber}
     */

    add_(addend) {
        const complexAddend = ComplexNumber.toComplex(addend);
        this.re += complexAddend.re;
        this.im += complexAddend.im;
    }

    add(addend) {
        // Make sure we're dealing with complex number.
        const complexAddend = ComplexNumber.toComplex(addend);

        return new ComplexNumber({
            re: this.re + complexAddend.re,
            im: this.im + complexAddend.im,
        });
    }

    /**
     * @param {ComplexNumber|number} subtrahend
     * @return {ComplexNumber}
     */
    subtract(subtrahend) {
        // Make sure we're dealing with complex number.
        const complexSubtrahend = ComplexNumber.toComplex(subtrahend);

        return new ComplexNumber({
            re: this.re - complexSubtrahend.re,
            im: this.im - complexSubtrahend.im,
        });
    }

    /**
     * @param {ComplexNumber|number} multiplicand
     * @return {ComplexNumber}
     */
    multiply(multiplicand) {
        // Make sure we're dealing with complex number.
        const complexMultiplicand = ComplexNumber.toComplex(multiplicand);

        return new ComplexNumber({
            re:
                this.re * complexMultiplicand.re -
                this.im * complexMultiplicand.im,
            im:
                this.re * complexMultiplicand.im +
                this.im * complexMultiplicand.re,
        });
    }

    /**
     * @param {ComplexNumber|number} divider
     * @return {ComplexNumber}
     */
    divide(divider) {
        // Make sure we're dealing with complex number.
        const complexDivider = ComplexNumber.toComplex(divider);

        // Get divider conjugate.
        const dividerConjugate = this.conjugate(complexDivider);

        // Multiply dividend by divider's conjugate.
        const finalDivident = this.multiply(dividerConjugate);

        // Calculating final divider using formula (a + bi)(a − bi) = a^2 + b^2
        const finalDivider = complexDivider.re ** 2 + complexDivider.im ** 2;

        return new ComplexNumber({
            re: finalDivident.re / finalDivider,
            im: finalDivident.im / finalDivider,
        });
    }

    /**
     * @param {ComplexNumber|number} number
     */
    conjugate(number) {
        // Make sure we're dealing with complex number.
        const complexNumber = ComplexNumber.toComplex(number);

        return new ComplexNumber({
            re: complexNumber.re,
            im: -1 * complexNumber.im,
        });
    }

    /**
     * @return {number}
     */
    getRadius() {
        return Math.sqrt(this.re ** 2 + this.im ** 2);
    }

    /**
     * @param {boolean} [inRadians]
     * @return {number}
     */
    getPhase(inRadians = true) {
        let phase = Math.atan(Math.abs(this.im) / Math.abs(this.re));

        if (this.re < 0 && this.im > 0) {
            phase = Math.PI - phase;
        } else if (this.re < 0 && this.im < 0) {
            phase = -(Math.PI - phase);
        } else if (this.re > 0 && this.im < 0) {
            phase = -phase;
        } else if (this.re === 0 && this.im > 0) {
            phase = Math.PI / 2;
        } else if (this.re === 0 && this.im < 0) {
            phase = -Math.PI / 2;
        } else if (this.re < 0 && this.im === 0) {
            phase = Math.PI;
        } else if (this.re > 0 && this.im === 0) {
            phase = 0;
        } else if (this.re === 0 && this.im === 0) {
            // More correctly would be to set 'indeterminate'.
            // But just for simplicity reasons let's set zero.
            phase = 0;
        }

        if (!inRadians) {
            phase = radianToDegree(phase);
        }

        return phase;
    }

    /**
     * @param {boolean} [inRadians]
     * @return {{radius: number, phase: number}}
     */
    getPolarForm(inRadians = true) {
        return {
            radius: this.getRadius(),
            phase: this.getPhase(inRadians),
        };
    }

    exp() {
        return new ComplexNumber({
            re: cos(this.im) * Math.exp(this.re),
            im: sin(this.im) * Math.exp(this.re),
        });
    }

    /**
     * Convert real numbers to complex number.
     * In case if complex number is provided then lefts it as is.
     *
     * @param {ComplexNumber|number} number
     * @return {ComplexNumber}
     */
    static toComplex(number) {
        if (number instanceof ComplexNumber) {
            return number;
        }

        return new ComplexNumber({ re: number, im: 0 });
    }
}



/**
 * Returns the radix-2 fast fourier transform of the given array.
 * Optionally computes the radix-2 inverse fast fourier transform.
 *
 * @param {ComplexNumber[]} inputData
 * @param {boolean} [inverse]
 * @return {ComplexNumber[]}
 */

// export function dft(x){
//     N = nj.float32(x);
//     n = nj.arange(N);
//     k = n.reshape(N, 1);
//     j = new ComplexNumber({re:0, im:-2});
//     M = nj.exp(-2j * PI * k * n / N)
//     return np.dot(M, x)
// }

export function rec_fft(x) {
    let N = x.length;
    let X = new Array(N);

    if (N % 2 > 0) throw  Error('x must be power of 2');
    else if (N === 2) {
        for (let i = 0; i < x.length; i++) X[i] = new ComplexNumber();

        for (let k = 0; k < X.length; k++) {
            for (let n = 0; n < x.length; n++) {
                X[k].add_(
                    new ComplexNumber({
                        re: 0,
                        im: (-2 * PI * k * n) / N,
                    })
                        .exp()
                        .multiply(x[n])
                );
            }
        }

        return X;
    } else {
        let X_even = rec_fft(x.filter((a, i) => i % 2 === 0));
        let X_odd = rec_fft(x.filter((a, i) => i % 2 === 1));
        let N_2 = Math.floor(N / 2);
        for (let n = 0; n < N; n++) {
            X[n] = X_even[n % N_2].add(
                new ComplexNumber({ re: 0, im: (-2 * PI * n) / N })
                    .exp()
                    .multiply(X_odd[n % N_2])
            );
        }
        return X;
    }
}

export function fft(inputData) {
    const bitsCount = bitLength(inputData.length - 1);
    const N = 1 << bitsCount;

    inputData = inputData.map(ComplexNumber.toComplex);

    while (inputData.length < N) {
        inputData.push(new ComplexNumber());
    }

  let output = rec_fft(inputData)
  return output;
}

export function binpow (a, n) {
  let res = 1;
  while (n>0) {
    if (n & 1)
      res *= a;
    a *= a;
    n >>= 1;
  }
  return res;
}
console.log(binpow(2,3))

var taylor_n = 3

var sin_fctrl = calc_factorials(taylor_n,(n)=>2*n+1);

export function sin_taylor(x){
  if(!(x instanceof Array)){
    x = [x];
  }
  let fx = 0;
  x.forEach((x_i)=>{
    for(let i=0; i<taylor_n; i++){
      fx+= (i%2===0?1:-1)*binpow(x_i,2*i+1)/sin_fctrl[i];
    }
  });
  return fx;
}

console.log(sin_taylor([0.8,0.3]))

