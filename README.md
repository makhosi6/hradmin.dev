# hradmin.dev
HR Administration System which allowing users to efficiently manage employee details and department information. Employees can be added with essential data such as name, contact details, and manager, while HR Administrators have full control over all aspects, including user access and department statuses.


### DB docker
 - `docker run -d -p 5984:5984 --name hradmin-dev-couchdb -e COUCHDB_USER=devuser -e COUCHDB_PASSWORD=Pa55w0rd@dev apache/couchdb`