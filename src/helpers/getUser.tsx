const getUser = async() => {
    const userId = Math.floor((Math.random()*10)+1)

    const url = `http://jsonplaceholder.typicode.com/users/${userId}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

export default getUser