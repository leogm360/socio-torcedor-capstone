#!/usr/bin/env bash

<<comment
 - Name: Postgres User
 - Description: Automatically creates a test/database in postgres for running 
   unitary and integration tests.
 - Author: Leonardo Moraes
 - License: MIT
    <Begin license text.>
      Copyright 2022 Leonardo Moraes

      Permission is hereby granted, free of charge, to any person obtaining a 
      copy of this software and associated documentation files (the "Software"), 
      to deal in the Software without restriction, including without limitation 
      the rights to use, copy, modify, merge, publish, distribute, sublicense, 
      and/or sell copies of the Software, and to permit persons to whom the 
  
      Software is furnished to do so, subject to the following conditions:

      The above copyright notice and this permission notice shall be included in 
      all copies or substantial portions of the Software.

      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS 
      OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
      THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
      FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
      DEALINGS IN THE SOFTWARE.
    <End license text.>
 - Version: 0.1.0
comment

#VARS
POSTGRES_OPERATION=""
USER_NAME="teste"
USER_PASSWORD="123456789"
TEST_DB="teste"

#VARS

#SCRIPT START
cd ~postgres/ || exit 0

#SELECT OPERATION
echo -e "\n❓ Wich postgres operation should be executed?\n"

options=("Create User/Database" "Delete User/Database" "Quit")

select OPT in "${options[@]}"; do
  case $OPT in
  "Create User/Database")
    echo -e "\nCreate User/Database\n"

    POSTGRES_OPERATION="create"

    break
    ;;
  "Delete User/Database")
    echo -e "\nDelete User/Database\n"

    POSTGRES_OPERATION="delete"

    break
    ;;
  "Quit")
    echo -e "\n"

    exit 0
    ;;
  *) echo "Invalid Operation" ;;
  esac
done
#SELECT OPERATION

#CUSTOM CREDENTIALS
if [ $POSTGRES_OPERATION = "create" ]; then
  echo -e "\n❓ Want to customize the postgres credentials? y/N\n"

  select YN in "y" "n"; do
    case $YN in
    "y")
      read -r -p "🧑 User name? " USER_NAME

      read -r -p "🔑 User password? " USER_PASSWORD

      read -r -p "🗃️ User database name? " TEST_DB
      break
      ;;
    "n")

      break
      ;;
    *) echo "Invalid Option, aborting." ;;
    esac
  done
else
  echo -e "\n❓ Which user/database do you want to delete?\n"

  read -r -p "🧑 User name? " USER_NAME

  read -r -p "🗃️  User database name? " TEST_DB
fi
#CUSTOM CREDENTIALS

#EXECUTE SCRIPT
if [ $POSTGRES_OPERATION = "create" ]; then
  echo -e "\n"

  sudo -u postgres psql <<querie
  CREATE USER $USER_NAME SUPERUSER CREATEROLE CREATEDB;
  ALTER USER $USER_NAME PASSWORD '$USER_PASSWORD';
  CREATE DATABASE $TEST_DB;
  ALTER DATABASE $USER_NAME OWNER TO $USER_NAME;
querie
else
  echo -e "\n"

  sudo -u postgres psql <<querie
  DROP DATABASE $TEST_DB;
  DROP USER $USER_NAME; 
querie
fi
#EXECUTE SCRIPT

#SCRIPT END
