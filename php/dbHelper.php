<?php
class db{//数据库简单操作封装
    private $db_ip = 'localhost';
    private $db_user = 'root';
    private $db_pwd = '123456';
    private $db_database = 'shopcar';
    private $conn;
    //连接封装
    public function connect(){
        $this->conn = @new mysqli($this->db_ip,$this->db_user,$this->db_pwd,$this->db_database);
        if($this->conn->connect_error){
            die('数据库连接失败:'.$this->$conn->connect_error);//die函数：输出括号里面的内容，并退出。
        }
        mysqli_set_charset($this->conn,'utf8');
    }
    //插入$table为表名;$data为对象
    public function insert($table,$data){
        $keysArr = array();
        $valuesArr = array();
        foreach($data as $key => $value){
            array_push($keysArr,$key);
            array_push($valuesArr,$value);
        }
        $keys = '`' . implode('`,`',array_values($keysArr)) . '`';
        $values = '\'' . implode('\',\'',array_values($valuesArr)) . '\'';
        $sql = "INSERT INTO $table ({$keys}) VALUE ({$values})";
        $sql = str_replace("''",'null',$sql);
        $this->conn->query($sql);
        return $this->conn->insert_id;
    }
    //查询封装
    public function selectAll($table,$field=null,$where=null){
        $sql = "SELECT * FROM {$table}";//默认查询所有
        if(!empty($field)){//$field为要查询列的数组，如果为空返回整行;
            if(is_array($field)){
                $field = '`' . implode('`,`',$field) . '`';
            }else{
                $field = '`' . $field . '`';
            }
            $sql = str_replace('*',$field,$sql);
        }
        if(!empty($where)){//where为条件,默认查询所有行
            $sql = $sql . ' WHERE ' . $where;
        }
        $result = $this->conn->query($sql);
        $resArr = array();
        for($i=0;$i<$result->num_rows;$i++){
            array_push($resArr,$result->fetch_assoc());
        }
        return $resArr;
    }
    //update封装
    public function updataAll($table,$data,$where){
        $kvArr = array();
        foreach($data as $key => $value){
            array_push($kvArr,"`{$key}`='{$value}'");
        }
        $kvArr = implode(',',array_values($kvArr));
        $sql = "UPDATE {$table} SET {$kvArr} WHERE {$where}";
        $sql = str_replace("''",'null',$sql);
        echo $sql;
        $this->conn->query($sql);
        return $this->conn->affected_rows;
    }
    //delete封装
    public function delete($table,$where){
        $sql = "DELETE FROM {$table} WHERE {$where}";
        $this->conn->query($sql);
        return $this->conn->affected_rows;
    }
}
