// 导入express和multer模块
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path')

// 导入cors
const cors = require('cors')

// 创建web服务实例
const app = express();

// 配置cors，解决跨域问题
app.use(cors());

//app.use(multer({ dest: './save' }).any())
// 指定文件名，保存在本地硬盘
var storage = multer.diskStorage({
    // 指定保存的目录
    destination: function(req, file, cb) {
        cb(null, __dirname + '/files/uploads');
    },
    // 指定保存的文件名
    filename: function(req, file, cb) {
        //先写死吧，看后续怎么去动态处理
        var saveFileName = file.fieldname + '_' + Date.now() + '.jpg'
        console.log(saveFileName);

        cb(null, saveFileName)
    }
})

app.use(multer({ storage: storage }).any())
app.use(express.static('./files'))

// 监听post请求
app.post('/api/upload', function(req, res) {
    console.log(req.files)
        // fieldname: input控件的name属性
        // originalname: 文件在用户设备中的原始名称
        // encoding: 文件的编码类型
        // mimetype: 文件的mime类型
        // destination: 文件的保存目录
        // filename: 文件在destination中的名称(diskstorages)
        // path: 上传文件的全路径
        // size: 文件的大小

    // 把文件存储到磁盘中
    // console.log('path is :' + req.files[0].path);

    // var newFilename = req.files[0].path + path.parse(req.files[0].originalname).ext

    // fs.rename(req.files[0].path, newFilename, function(err) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log(newFilename);

    //         res.send({ "msg": "上传文件成功", "status": 200, "url": newFilename })
    //     }

    // })
    var url = '/uploads/' + req.files[0].filename;
    res.send({ "msg": "上传文件成功", "status": 200, "url": url })
})

app.listen(8081, function(req, res) {
    console.log('file upload server is running at http://127.0.0.1:8081');
})