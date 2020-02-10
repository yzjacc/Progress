import Header from "./components/header.js"

const template = `
    <div>
        <Header/>
        <RouterView></RouterView>
    </div>
`;

export default {
    template,
    components: {
        Header
    }
}