export const validatePIN = (value: string) => {
  if(value.length < 6){
    return false;
  }
    const arr = value.split('').map((num) => Number(num));
    let seqCount = 0;
    for (let i = 0; i < 6; i++) {
      let samCount = 0;
      if (arr[i] === arr[i + 1] - 1) {
        seqCount++;
      } else {
        seqCount = 0;
      }
      for (let j = i; j < 6; j++) {
        if (arr[i] === arr[j]) {
          samCount++;
        }
        if (samCount === 3) {
          console.log('Repeated Numbers Detected');
          return false;
        }
      }
      if (seqCount === 5) {
        console.log('Sequence Detected');
        return false;
      }
    }
    return true
  };