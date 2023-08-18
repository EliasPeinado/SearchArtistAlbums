
module.exports = (app: any) => {

    try {
        app.listen(app.get('port'), () => {
            console.log('Server on port ', app.get('port'))
        })
    } catch (error) {
        console.error("Error during database sync:", error);
    }

}
