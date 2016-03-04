#**wim-styles**

Styling for WiM applications

####/core:  core styling, based on WiM Styleguide

####/template:  styling for generator-wim generated mapping apps

##Core WiM styles

### Adding as managed bower package to a project

##### Step 1.
Add wim-styles to the dependencies list in the project's bower.json:
```
"dependencies": {
	  "wim-styles": "USGS-WiM/wim-styles"
  }
```

#####Step 2.
Tell bower to get the package from github and place it in your bower_components folder
```bash
bower install
```
This will install all packages in your bower.json dependencies list. Alternatively you can specify
```bash
bower install wim-styles
```
to install only that package

#####Step 3.
Add the stylesheet reference to the index.html:
```html
 <link rel="stylesheet" href="bower_components/wim-styles/core/css/wim.css">
```

#####Step 4(optional).
Specify version in your dependencies list.  Version is important for ensuring the app does not break. Below will specify v0.0.12:

```
"dependencies": {
	  "wim-mapper-styles": "USGS-WiM/wim-styles#0.0.12"
  }
```

If no version is specified, bower will retrieve the latest release (which may not be the latest commit).


###Updating core styles

####This is the workflow for updating the core styles, which would apply changes to all applications importing wim-styles via bower, per the version specified.

After making style changes to the less files, less must be compiled, and version must be bumped up.

### To compile wim.css

#### Install required software
```
npm install -g less
```

#### 1.  Get project dependencies
```
npm install
```

#### 2.  Compile CSS
```
cd core/less
lessc wim.less ../css/wim.css
```

------


##Template styles

### Adding as managed bower package to map application made with [generator-wim](https://github.com/USGS-WiM/generator-wim)

##### Step 1.
Add wim-styles to the dependencies list in the project's bower.json:
```
"dependencies": {
	  "wim-styles": "USGS-WiM/wim-styles"
  }
```

#####Step 2.
Tell bower to get the package from github and place it in your bower_components folder
```bash
bower install
```
This will install all packages in your bower.json dependencies list. Alternatively you can specify
```bash
bower install wim-styles
```
to install only that package

#####Step 3.
Add the stylesheet reference to the index.html:
```html
 <link rel="stylesheet" href="bower_components/wim-styles/template/css/base.css">
```
**Note:** Be sure to place base.css *after* main.css, as it overwrite some classes from main.

#####Step 4(optional).
Specify version in your dependencies list.  Version is important for ensuring the app does not break. Below will specify v0.0.12:

```
"dependencies": {
	  "wim-mapper-styles": "USGS-WiM/wim-styles#0.0.12"
  }
```

If no version is specified, bower will retrieve the latest release (which may not be the latest commit).

Other ways to specify version:

> semver version:    #1.2.3
>
> version range:    #1.2
>
> \#~1.2.3
>
> \#^1.2.3
>
> \#>=1.2.3 <2.0
>
> Git tag:     #[tag]
>
> Git commit SHA:     #[sha]
>
> Git branch:     #[branch]
>
> Subversion revision:     #[revision]



----------


###Updating template styles

####This is the workflow for updating the  template styles, which would apply changes to all applications importing wim-styles via bower, per the version specified.

After making style changes to the less files, less must be compiled, and version must be bumped up.

### To compile base.css

#### Install required software
```
npm install -g less
```

#### 1.  Get project dependencies
```
npm install
```

#### 2.  Compile CSS
```
cd template/less
lessc base.less ../css/base.css
```

------

## Building a release
Follow the steps below to create a new release version tag when significant styles changes have been made. Use `feature` or `release` when applying a breaking change.


##### Step 1.
Bump the version.  Run only one of the below commands.
This creates a local commit with the package.json, bower.json and tsd.json updated to the new version number

```
gulp patch     # makes v0.1.0 → v0.1.1
gulp feature   # makes v0.1.1 → v0.2.0
gulp release   # makes v0.2.1 → v1.0.0
```

##### Step 2.
Push the commit that contains the json files with bumped versions to your personal github repo

```
git push origin master
```

##### Step 3.
Create and merge pull request with version incremented via github.com

##### Step 4.
Get latest version from upstream (all this should be is a commit for the pull request in Step 3.)

```
git pull upstream master
```

##### Step 5.
Push the commit with the release tags up to the upstream (WiM) repository.

```
git push upstream master --tags
```


----------


> Written with [StackEdit](https://stackedit.io/).
