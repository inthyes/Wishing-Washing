

router.post('/', upload.array('uploadfile'), (request, response) => {
    console.log('# POST /upload');

     /* 업로드된 파일은 request에 담겨있다. */
    var files = request.files;

    console.log('files length : ' + files.length);

    var html = '<h1>파일 업로드 결과</h1>';

    if(files.length > 0){
        files.forEach((file, idx) => {
            console.log('idx : ' + idx);
            console.dir(file);

            html += `
                <div>
                    <img src="upload/${file.filename}">
                </div>
            `
        });
    }
    else{
        console.log('Upload files aren\'t exist');
        html += '<div>파일이 존재하지 않습니다.</div>';
    }

    response.send(html);
});