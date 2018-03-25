        function User_Profile(username)
        {
            this.username = username;
            //unique ID is given, set to index [?][0]
            this.userID = currentUserID++;
            //This will make further purchasing of this item impossible
            this.library = [ //0, 1, 1, 0, 0, 0, 1, 0, 0, 1
                userList[logedUserIndex][2], userList[logedUserIndex][3], userList[logedUserIndex][4],
                userList[logedUserIndex][5], userList[logedUserIndex][6], userList[logedUserIndex][7],
                userList[logedUserIndex][8], userList[logedUserIndex][9], userList[logedUserIndex][10],
                userList[logedUserIndex][11]
            ];

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