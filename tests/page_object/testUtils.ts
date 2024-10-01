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

export const generateRandomUser = () => {
    const firstNames = ['Aiden', 'Zoe', 'Grayson', 'Aria', 'Cameron', 'Scarlett', 'Owen', 'Lily', 'Isaac', 'Nora'];
    const lastNames = ['Wright', 'Powell', 'James', 'Peterson', 'Foster', 'Simmons', 'Price', 'Bryant', 'Hawkins', 'Cruz'];



    const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    const getRandomElement = (array: string[]) => array[Math.floor(Math.random() * array.length)];
    const getRandomEmail = (name: string, lastname: string) => {
        const domains = ['example.com', 'mail.com', 'test.com'];
        return `${name.toLowerCase()}.${lastname.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;
    };

    const id = getRandomNumber(1000, 9999).toString();
    const name = getRandomElement(firstNames);
    const lastname = getRandomElement(lastNames);
    const username = `${name}.${lastname}`
    const email = getRandomEmail(name, lastname);
    const password = Math.random().toString(36).slice(-10);
    const phone = getRandomNumber(1000000000, 9999999999).toString();
    const userStatus = getRandomNumber(0, 10).toString();

    const randomData = {
        id,
        username,
        name,
        lastname,
        email,
        password,
        phone,
        userStatus
    };

    return randomData
}
