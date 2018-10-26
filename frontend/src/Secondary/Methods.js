import axios from "axios";



export var getData =  async function(URL) {
    axios.get(URL).then((response) => {
        return response;
    });

};


export var postData = async function(URL, params){

    axios.post(URL,params).then((response) => {
        console.log(response.data);
        return response
    })
};
