
class App {
    
    render() {
        const title = document.createElement('h1');
        title.textContent = 'Hosein Doran';
        title.classList.add('title-app');

        return title;
    }
}
export default new App;