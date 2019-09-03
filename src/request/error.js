import { MessageBox } from 'mint-ui';
export default function HttpErrorParser(status){
    switch(status){
        case 403:{
            MessageBox('错误', '用户异常');
            break;
        }
        case 500:{
            MessageBox('错误', '服务器繁忙请稍后再试');
            break;
        }
        case 404:{
            MessageBox('错误', '您访问的资源不存在或被删除');
            break;
        }
        case 101:{
            MessageBox('提示', '正在加载更多');
            break;
        }
    }
}