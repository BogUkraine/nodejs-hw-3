define({ "api": [
  {
    "type": "post",
    "url": "/api/auth/register",
    "title": "register user",
    "name": "PostUser",
    "group": "auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "login",
            "description": "<p>User's login.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User's role.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>User was successfully registered.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserAlreadyExists",
            "description": "<p>User already exists.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserWasntRegistered",
            "description": "<p>User was not registered.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/auth.routes.js",
    "groupTitle": "auth"
  },
  {
    "type": "post",
    "url": "/api/auth/login",
    "title": "login user",
    "name": "PostUser",
    "group": "auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "login",
            "description": "<p>User's login.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User's role.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>User jwt.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User unique id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "login",
            "description": "<p>User login.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User role: shipper or driver.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserDoesntExist",
            "description": "<p>This user doesn't exist.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserWrongPassword",
            "description": "<p>Wrong password.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserWasntLogined",
            "description": "<p>User wasn't logined.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/auth.routes.js",
    "groupTitle": "auth"
  },
  {
    "type": "put",
    "url": "/api/loads/:id",
    "title": "deleting load by id",
    "name": "DeleteLoad",
    "group": "loads",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>User's jwt from local storage.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Load was successfully deleted.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserIsntAuthorized",
            "description": "<p>User is not authorized.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadWasntAssigned",
            "description": "<p>Load wasn't deleted.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/loads.routes.js",
    "groupTitle": "loads"
  },
  {
    "type": "get",
    "url": "/api/loads/shipper",
    "title": "get shipper's loads.",
    "name": "GetLoads",
    "group": "loads",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>User's jwt from local storage.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "loads",
            "description": "<p>shipper's loads.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserIsntAuthorized",
            "description": "<p>User is not authorized.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadsWerntFetched",
            "description": "<p>Loads were not fetched.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/loads.routes.js",
    "groupTitle": "loads"
  },
  {
    "type": "get",
    "url": "/api/loads/driver",
    "title": "get driver's loads.",
    "name": "GetLoads",
    "group": "loads",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>User's jwt from local storage.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "loads",
            "description": "<p>driver's loads.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserIsntAuthorized",
            "description": "<p>User is not authorized.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadsWerntFetched",
            "description": "<p>Loads were not fetched.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/loads.routes.js",
    "groupTitle": "loads"
  },
  {
    "type": "post",
    "url": "/api/loads/",
    "title": "create load.",
    "name": "PostLoad",
    "group": "loads",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>User's jwt from local storage.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "dimensions",
            "description": "<p>load's dimensions.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "payload",
            "description": "<p>load's payload.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "dimensions.width",
            "description": "<p>load's width.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "dimensions.height",
            "description": "<p>load's height.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "dimensions.length",
            "description": "<p>load's length.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "10...",
            "optional": true,
            "field": "message",
            "description": "<p>load's additional message.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "defaultValue": "NEW",
            "description": "<p>load's additional message.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state",
            "defaultValue": "Waiting",
            "description": "<p>load's additional message.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Load was successfully created.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserIsntAuthorized",
            "description": "<p>User is not authorized.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadWasntCreated",
            "description": "<p>Load wasn't created.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/loads.routes.js",
    "groupTitle": "loads"
  },
  {
    "type": "put",
    "url": "/api/loads/:id/data",
    "title": "change load info",
    "name": "PutLoad",
    "group": "loads",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>User's jwt from local storage.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "dimensions",
            "description": "<p>load's dimensions.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "payload",
            "description": "<p>load's payload.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "dimensions.width",
            "description": "<p>load's width.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "dimensions.height",
            "description": "<p>load's height.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "dimensions.length",
            "description": "<p>load's length.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "10...",
            "optional": true,
            "field": "message",
            "description": "<p>load's additional message.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Load was successfully changed.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserIsntAuthorized",
            "description": "<p>User is not authorized.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadWasntChanged",
            "description": "<p>Load wasn't changed.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadDoesntExist",
            "description": "<p>Load doesn't exist.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/loads.routes.js",
    "groupTitle": "loads"
  },
  {
    "type": "put",
    "url": "/api/loads/:id/status",
    "title": "send load to system to find suitable truck",
    "name": "PutLoad",
    "group": "loads",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>User's jwt from local storage.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Load was successfully assigned.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserIsntAuthorized",
            "description": "<p>User is not authorized.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadWasntAssigned",
            "description": "<p>Load wasn't assigned.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadDoesntExist",
            "description": "<p>Load doesn't exist.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TruckDoesntExist",
            "description": "<p>There are no fitting trucks at this moment.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/loads.routes.js",
    "groupTitle": "loads"
  },
  {
    "type": "put",
    "url": "/api/loads/:id/shipped",
    "title": "driver had operated with load and shippedit",
    "name": "PutLoad",
    "group": "loads",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>User's jwt from local storage.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Load was successfully shipped.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserIsntAuthorized",
            "description": "<p>User is not authorized.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadWasntAssigned",
            "description": "<p>Load wasn't shipped.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadDoesntExist",
            "description": "<p>Load doesn't exist.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TruckDoesntExist",
            "description": "<p>Truck was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/loads.routes.js",
    "groupTitle": "loads"
  },
  {
    "type": "delete",
    "url": "/api/profile/:id",
    "title": "delete user profile",
    "name": "DeleteProfile",
    "group": "profiles",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>User's jwt from local storage.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>User was successfully deleted.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserIsntAuthorized",
            "description": "<p>User is not authorized.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ProfileWasntChanged",
            "description": "<p>Profile data wasn't deleted.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/profile.routes.js",
    "groupTitle": "profiles"
  },
  {
    "type": "get",
    "url": "/api/profile/:id",
    "title": "get user info",
    "name": "GetProfile",
    "group": "profiles",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>User's jwt from local storage.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserIsntAuthorized",
            "description": "<p>User is not authorized.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserDoesntExist",
            "description": "<p>User doesn't exist.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CantGetUser",
            "description": "<p>Can not get profile.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/profile.routes.js",
    "groupTitle": "profiles"
  },
  {
    "type": "put",
    "url": "/api/profile/:id/password",
    "title": "change user password",
    "name": "PutProfile",
    "group": "profiles",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>User's jwt from local storage.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>new password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Profile data was successfully changed.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserIsntAuthorized",
            "description": "<p>User is not authorized.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DriverIsBusy",
            "description": "<p>Driver is busy, you can not change any info.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ProfileWasntChanged",
            "description": "<p>Profile data wasn't changed.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/profile.routes.js",
    "groupTitle": "profiles"
  },
  {
    "type": "put",
    "url": "/api/profile/:id/photo",
    "title": "change user photo",
    "name": "PutProfile",
    "group": "profiles",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>User's jwt from local storage.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Buffer",
            "optional": false,
            "field": "photo",
            "description": "<p>photo.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Photo was changed.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserIsntAuthorized",
            "description": "<p>User is not authorized.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DriverIsBusy",
            "description": "<p>Driver is busy, you can not change any info.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ProfileWasntChanged",
            "description": "<p>Profile data wasn't changed.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/profile.routes.js",
    "groupTitle": "profiles"
  },
  {
    "type": "delete",
    "url": "/api/trucks/:id",
    "title": "delete truck by truck id.",
    "name": "DeleteTruck",
    "group": "trucks",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>User's jwt from local storage.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Truck was successfully deleted.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserIsntAuthorized",
            "description": "<p>User is not authorized.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DriverIsBusy",
            "description": "<p>Driver is busy, you can not change any info.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TruckWasntDeleted",
            "description": "<p>Truck wasn't deleted.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/trucks.routes.js",
    "groupTitle": "trucks"
  },
  {
    "type": "get",
    "url": "/api/trucks/",
    "title": "get trucks.",
    "name": "GetTruck",
    "group": "trucks",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>User's jwt from local storage.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "trucks",
            "description": "<p>user trucks.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserIsntAuthorized",
            "description": "<p>User is not authorized.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TrucksWerntFetched",
            "description": "<p>Trucks weren't fetched.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/trucks.routes.js",
    "groupTitle": "trucks"
  },
  {
    "type": "post",
    "url": "/api/trucks/:id",
    "title": "create truck by user id.",
    "name": "PostTruck",
    "group": "trucks",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>User's jwt from local storage.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "sizes",
            "description": "<p>truck sizes.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "weight",
            "description": "<p>truck can carry this weight.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sizes.width",
            "description": "<p>truck width.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sizes.height",
            "description": "<p>truck height.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sizes.length",
            "description": "<p>truck length.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>truck name.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Truck was successfully added.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserIsntAuthorized",
            "description": "<p>User is not authorized.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TruckWasntCreated",
            "description": "<p>Truck wasn't created.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/trucks.routes.js",
    "groupTitle": "trucks"
  },
  {
    "type": "put",
    "url": "/api/trucks/:id/assign",
    "title": "assign truck by truck id.",
    "name": "PutTruck",
    "group": "trucks",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>User's jwt from local storage.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Truck was successfully assigned.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserIsntAuthorized",
            "description": "<p>User is not authorized.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DriverIsBusy",
            "description": "<p>Driver is busy, you can not change any info.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TruckWasntAssigned",
            "description": "<p>Truck wasn't assigned.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/trucks.routes.js",
    "groupTitle": "trucks"
  },
  {
    "type": "put",
    "url": "/api/trucks/:id/name",
    "title": "change truck name by truck id.",
    "name": "PutTruck",
    "group": "trucks",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>User's jwt from local storage.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>new truck name.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Truck was successfully renamed.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserIsntAuthorized",
            "description": "<p>User is not authorized.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DriverIsBusy",
            "description": "<p>Driver is busy, you can not change any info.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TruckWasntRenamed",
            "description": "<p>Truck wasn't renamed.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/trucks.routes.js",
    "groupTitle": "trucks"
  }
] });
