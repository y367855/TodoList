// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
   fetch: function () {
      var todos = JSON.parse(
         localStorage.getItem(STORAGE_KEY) || '[]'
      )
      todos.forEach(function (todos, index) {
         todos.id = index
      })
      todoStorage.uid = todos.length
      return todos
   },
   save: function (todos) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
   }
}
var app = new Vue({
   el: '#app',
   data: {
      //使用するデータ
      todos: []
   },
   watch: {
      //オプションを使う場合はオブジェクト形式にする
      todos: {
         //引数はウォッチしているプロパティの変更後の値
         handler: function (todos) {
            todoStorage.save(todos)
         },
         //deepオプションでネストしているデータも監視できる
         deep: true
      },
      methods: {
         //使用するメソッド
         //ToDo追加の処理
         doAdd: function (event, value) {
            // refで名前を付けておいた要素を参照
            var comment = this.$refs.comment
            //入力がなければ何もしないでreturn
            if (!comment.value.length) {
               return
            }
            //{新しいID,コメント,作業状態}
            //というオブジェクトを現在のtodosリストへpush
            //作業状態「state」はデフォルト「作業中=0」で作成
            this.todos.push({
               id: todoStorage.uid++,
               comment: comment.value,
               state: 0
            })
            //フォーム要素を空にする
            comment.value = ''
         }
      },
      //状態変更の処理
      doChangeState: function (item) {
         item.state = item.state ? 0 : 1
      },
      //削除の処理
      doRemove: function (item) {
         var index = this.todos.indexof(item)
         this.todos.splice(index, 1)
      }
   },
   created() {
      //インスタンス作成時に自動的にfetch()する
      this.todos = todoStorage.fetch()
   }
})
