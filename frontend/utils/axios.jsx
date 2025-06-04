import axios from "axios";

const endpoint = "https://cheffy-by-codependents.onrender.com/api";

export const requestRecipes = (searchQuery, filterBy, category, order) => {
    const params = new URLSearchParams ();

    if (searchQuery)
        params.append("search", searchQuery)
    if (filterBy)
        params.append("filter", filterBy)
    if (category)
        params.append("category", category)
    if (order)
        params.append("order", order)

    return axios.get(`${endpoint}/recipes?${params.toString()}`)
        .then((response) => {
            return response.data.recipes
        })
        .catch((error) => {
            console.log(error)
        })
}