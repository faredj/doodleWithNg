/**
 * @fileOverview this file  contains the principal route
 */
module.exports = (app) => {
	app.get('/', (req, res)=>{
	    res.json('Doodle API is UP');
    });
};
