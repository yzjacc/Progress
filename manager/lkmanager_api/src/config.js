import {join} from 'path';

export default {
    viewPath: join(__dirname, '../views'),
    publicPath: join(__dirname, '../public'),
    node_modules: join(__dirname, '../node_modules'),
    upload_path: join(__dirname, '../public/uploads')
}