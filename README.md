# Languide
_Project is in a development stage_  
Collect words from different sources into one place. The web application for learning English, written in Spring Boot and Angular.  

Glossary is a hub for vocabulary. Every user can have access via his account to his dictionaries. The dictionaries can be shared between other users. A word may include information on definitions, usage, pronunciations with audio.  
Various imports:
- from a file (.txt or .csv)
- highlighted words from a plane text
- Kindle Vocabulary Builder
- movie subtitle (int the future)
- Anki application (int the future)

I have also a plan to add some educational features like a memory game and repetition.

## Used technology
Spring Boot (v2), Angular (v6), Java 8, Hibernate, H2 database, JUnit, Mockito, Bootstrap 4, JHipster generator

## Development

Before you can build this project, you must install and configure the following dependencies on your machine:

1. [Node.js][]: We use Node to run a development web server and build the project.
   Depending on your system, you can install Node either from source or as a pre-packaged bundle.

After installing Node, you should be able to run the following command to install development tools.
You will only need to run this command when dependencies change in [package.json](package.json).

    npm install

We use npm scripts and [Webpack][] as our build system.

Run the following commands in two separate terminals to create a blissful development experience where your browser
auto-refreshes when files change on your hard drive.

    ./mvnw
    npm start

[Npm][] is also used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [package.json](package.json). You can also run `npm update` and `npm install` to manage dependencies.
Add the `help` flag on any command to see how you can use it. For example, `npm help update`.

The `npm run` command will list all of the scripts available to run for this project.

## Building for production

To optimize the glossary application for production, run:

    ./mvnw -Pprod clean package

This will concatenate and minify the client CSS and JavaScript files. It will also modify `index.html` so it references these new files.
To ensure everything worked, run:

    java -jar target/*.war

Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.

Refer to [Using JHipster in production][] for more details.

## Testing

To launch your application's tests, run:

    ./mvnw clean test
