/**
 * Return the number of bits used in the binary representation of the number.
 *
 * @param {number} number
 * @return {number}
 */
export function bitLength(number) {
  let bitsCounter = 0;

  while ((1 << bitsCounter) <= number) {
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
      re: this.re * complexMultiplicand.re - this.im * complexMultiplicand.im,
      im: this.re * complexMultiplicand.im + this.im * complexMultiplicand.re,
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
    const finalDivider = (complexDivider.re ** 2) + (complexDivider.im ** 2);

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
    return Math.sqrt((this.re ** 2) + (this.im ** 2));
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

  static toNumber(number) {
    if (!(number instanceof ComplexNumber)) {
      return number;
    }
    else
    	return number.re;
  }
}

/**
 * Returns the number which is the flipped binary representation of input.
 *
 * @param {number} input
 * @param {number} bitsCount
 * @return {number}
 */
function reverseBits(input, bitsCount) {
  let reversedBits = 0;

  for (let bitIndex = 0; bitIndex < bitsCount; bitIndex += 1) {
    reversedBits *= 2;

    if (Math.floor(input / (1 << bitIndex)) % 2 === 1) {
      reversedBits += 1;
    }
  }

  return reversedBits;
}

/**
 * Returns the radix-2 fast fourier transform of the given array.
 * Optionally computes the radix-2 inverse fast fourier transform.
 *
 * @param {ComplexNumber[]} inputData
 * @param {boolean} [inverse]
 * @return {ComplexNumber[]}
 */
export function fft(inputData, inverse = false) {
  const bitsCount = bitLength(inputData.length - 1);
  const N = 1 << bitsCount;

  while (inputData.length < N) {
    inputData.push(new ComplexNumber());
  }

  const output = [];
  for (let dataSampleIndex = 0; dataSampleIndex < N; dataSampleIndex += 1) {
    output[dataSampleIndex] = inputData[reverseBits(dataSampleIndex, bitsCount)];
  }

  for (let blockLength = 2; blockLength <= N; blockLength *= 2) {
    const imaginarySign = inverse ? -1 : 1;
    const phaseStep = new ComplexNumber({
      re: Math.cos(2 * Math.PI / blockLength),
      im: imaginarySign * Math.sin(2 * Math.PI / blockLength),
    });

    for (let blockStart = 0; blockStart < N; blockStart += blockLength) {
      let phase = new ComplexNumber({ re: 1, im: 0 });

      for (let signalId = blockStart; signalId < (blockStart + blockLength / 2); signalId += 1) {
        const component = output[signalId + blockLength / 2].multiply(phase);

        const upd1 = output[signalId].add(component);
        const upd2 = output[signalId].subtract(component);

        output[signalId] = upd1;
        output[signalId + blockLength / 2] = upd2;

        phase = phase.multiply(phaseStep);
      }
    }
  }

  if (inverse) {
    for (let signalId = 0; signalId < N; signalId += 1) {
      output[signalId] /= N;
    }
  }

  return output;
}