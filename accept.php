<?php
if(isset($_POST['data'])){
    $data = base64_decode($_POST['data']);
    $fp = fopen('accept.txt', 'a+');
    fwrite($fp, $data);
    fclose($fp);
    echo 'Sucesss';
    }
else{
    echo 'Fail';
}
?>