        id = 0
        function User_Profile(username)
        {

            this.username = username;
            //unique ID is given, set to index [?][0]
            this.userID = id++;
            //This will make further purchasing of this item impossible
            this.library = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

            //update library method, I think depends on how the UI appears, a check list would be simplest 
            this.updateLibrary = function(){
               
                for (var i = 0; i < this.library.length; i++)
                {
                    var checkBox = document.getElementById("checkBox0" + i);
                    
                    if
                    (checkBox.checked == true)
                    {
                        this.library[i] = 1;
                    }
                    else
                    {
                        this.library[i] = 0;
                    }
                }
                localStorage.setItem("library-" + this.userID, JSON.stringify(this.library));

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
                    if (localStorage.key(i).includes("library-" + this.userID))
                    {
                        //alert(this.library);
                         this.library = JSON.parse(localStorage.getItem("library-" + this.userID));
                        //this.library = localStorage.getItem();
                    }
                } 
                

                for (var i = 0; i < this.library.length; i++)
                {
                    if (this.library[i] == 1)
                    {
                       str += gameList[i][1] + "</br>";
                    }
                }
                return str;
            }

        //userCheckbox
        }