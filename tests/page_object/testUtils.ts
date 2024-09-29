import dotenv from 'dotenv'
dotenv.config()

export const convertToFloat = (value: string): number => {

    value = value.replace(/[^0-9.]+/g, '');

    const num: number = parseFloat(parseFloat(value).toFixed(2));

    return num;
}

export const getTwoRandomNumbers = (range: number): [number, number] => {

    const randomNum1 = getRandomInt(range)
    let randomNum2 = getRandomInt(range)

    while (randomNum2 == randomNum1) {
        randomNum2 = getRandomInt(range)
    }


    return [randomNum1, randomNum2];

}

//fuction to get a random number
export const getRandomInt = (length: number): number => {

    let number = Math.floor(Math.random() * (length - 1) + 1)
    return number;
}
