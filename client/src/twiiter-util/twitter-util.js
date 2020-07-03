import axios from "axios";
const twitterUserSearch = (input) => {
    axios.get(`/${input}`)
        .then(res => {
            console.log(res)
            console.log(res.json())
            const result = res.map(user => user.name)

            const userIds = res.map(user => user.id)

            return { result: result, userIds: userIds };
        })
        .catch(err => console.log(err))
}

export default twitterUserSearch
