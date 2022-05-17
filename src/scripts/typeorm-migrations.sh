#!/usr/bin/env bash

<<comment
 - Name: Typeorm Migrations
 - Description: Choose whatever migration command type to execute and wich
   naming convention will be used by migrations files.
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
 - Version: 0.2.0
comment

#VARS
export TYPEORM_OPERATION=""
export MIGRATION_NAME=""
export CONVERT_TS_COMMONJS=typeorm-ts-node-commonjs
#VARS

#SCRIPT START

#SELECT OPERATION
echo -e "🛠️  Wich typeorm migration operation should be executed?\n"

options=("Migration Create" "Migration Generate" "Migration Run" "Quit")

select OPT in "${options[@]}"; do
  case $OPT in
  "Migration Create")
    echo -e "\nMigration Create\n"

    TYPEORM_OPERATION="migration:create"

    break
    ;;
  "Migration Generate")
    echo -e "\nMigration Generate\n"

    TYPEORM_OPERATION="migration:generate"

    break
    ;;
  "Migration Run")
    echo -e "\nMigration Run\n"

    TYPEORM_OPERATION="migration:run"

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

#SELECT NAME
if [ $TYPEORM_OPERATION != "migration:run" ]; then
  echo -e "🛠️  Wich name migration should have?\n"

  read -r MIGRATION_NAME

  echo -e "\n"
fi
#SELECT NAME

#EXECUTE SCRIPT
if [ $TYPEORM_OPERATION = "migration:create" ]; then
  yarn $CONVERT_TS_COMMONJS $TYPEORM_OPERATION src/migrations/"$MIGRATION_NAME"
elif [ $TYPEORM_OPERATION = "migration:generate" ]; then
  yarn $CONVERT_TS_COMMONJS $TYPEORM_OPERATION src/migrations/"$MIGRATION_NAME" -d src/data-source.ts
else
  yarn $CONVERT_TS_COMMONJS $TYPEORM_OPERATION -d src/data-source.ts
fi
#EXECUTE SCRIPT

#SCRIPT END
