        id = 0
        function User_Profile(username)
        {

            this.username = username;
            //unique ID is given, set to index [?][0]
            this.userID = id++;
            //This will make further purchasing of this item impossible
            this.library = [];

            //update library method, I think depends on how the UI appears, a check list would be simplest 
            this.updateLibrary = function(){
               

                for (var i = 0; i < gameList.length; i++)
                {
                    var checkBox = document.getElementById("checkBox0" + i);
                    
                    if
                    (checkBox.checked == true)
                    {
                        if (!(this.library.includes(gameList[i][0])))
                        {
                            this.library.push(gameList[i][0]);
                        }
                    }
                    else
                    {
                        if (this.library.includes(gameList[i][0]))
                        {
                            var index = this.library.indexOf(gameList[i][0]);
                            this.library.splice(index, 1)
                        }
                    }
                }
                localStorage.setItem("library-" + this.username, JSON.stringify(this.library));

                document.getElementById("objTest1").innerHTML = this.toString();
            }

            this.libraryToString = function()
            {
                for (var i = 0; i < this.library.length; i++)
                {
                    if (this.library[i] == 1)
                    {
                        document.getElementById("checkBox0" + i).checked = true; 
                    }
                    else
                    {
                        document.getElementById("checkBox0" + i).checked = false;
                    }
                }//for
            }

            this.toString = function(){
                var str = "Username: " + this.username + "</br>Games in library:</br>";

                
                for (var i = 0; i < localStorage.length; i++)
                {
                    //add to userList array, if begins with "user-"
                    if (localStorage.key(i).includes("library-" + this.username))
                    {
                        //alert(this.library);
                         this.library = JSON.parse(localStorage.getItem("library-" + this.username));
                        //this.library = localStorage.getItem();
                    }
                } 
                

                for (var i = 0; i < this.library.length; i++)
                {
                    for (var j = 0; j < gameList.length; j++){

                        if (this.library[i] == gameList[j][0])
                        {
                            str += gameList[j][1] + "</br>"; 
                        }            
                    }
                }
                return str;
            }

        //userCheckbox
        }