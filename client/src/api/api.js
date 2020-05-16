
const api = 'http://localhost:3005';


const headers = {
}


export const getQuestionnaires = () =>
    fetch(`${api}/questionnaire/`, { headers })
        .then(res => res.json())


// goToUsers() {
//     //just put your request directly in the method
//     fetch('http://localhost:300/users')
//         .then(response => {
//             //do something with response
//             const users = response.json();
//             this.setState({ users })
//         })
//         .catch(err => {
//             throw new Error(err)
//         })
// }