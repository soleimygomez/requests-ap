const express = require('express');
const categoryRoutes=require('./category.js');

//definicion de Rutas
function routerApi(app){
    const router=express.Router();
    app.use('/API/v1',router);
    router.use('/category',categoryRoutes);
}

module.exports =routerApi;