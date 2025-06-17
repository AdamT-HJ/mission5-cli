# Trademe Listings CLI

A comprehensive Command Line Interface (CLI) application built with Node.js, Commander.js, Inquirer.js, and Mongoose for managing simulated Trademe listings in a MongoDB database. This CLI provides full CRUD (Create, Read, Update, Delete) functionality, along with a seeding mechanism for dummy data.

## 🚀 Features

* **Database Seeding:** Quickly populate your MongoDB with dummy listing data.

* **Interactive Listing Creation:** Create new listings through guided prompts using Inquirer.js.

* **Flexible Search:** Find listings by exact ID, title (case-insensitive), or a keyword in either title or description.

* **Interactive Updates:** Update existing listings by ID with guided prompts, pre-filling current values.

* **Deletion Capabilities:** Delete individual listings by ID or clear all listings (with confirmation).

* **Global Access:** Install the CLI globally on your system to run commands from any directory.

## 🏁 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js (LTS version recommended):** You can download it from [nodejs.org](https://nodejs.org/).

* **npm:** Node.js installer usually includes npm.

* **MongoDB:**

    * Install MongoDB Community Server locally. Instructions vary by OS: [MongoDB Installation Guides](https://docs.mongodb.com/manual/installation/).

    * Ensure your MongoDB instance is running, typically on `mongodb://127.0.0.1:27017/`. The CLI is configured to connect to a database named `trademe` at this default URI.

### Cloning the Repository

First, clone this repository to your local machine:
```
git clone [YOUR_GITHUB_REPO_URL]
cd trademe-cli # Navigate into your project directory (or whatever your folder is named)
```
### Installation

Once in the project directory, install the required Node.js dependencies:
```
npm install
```
### Project Structure

Your project should have a structure similar to this (key files mentioned):

```
trademe-cli/
├── commands.js             # Main CLI entry point (Commander.js setup, commands, DB connection)
├── script.js               # Mongoose utility functions (CRUD operations, seeding logic)
├── listing.js              # Mongoose Schema and Model definition for Listings
├── dummyListings.js        # Contains the array of dummy data for seeding
├── package.json            # Project metadata and dependencies
└── README.md               # This file
```
### MongoDB Setup

Ensure your local MongoDB instance is running. The CLI is configured to connect to: `mongodb://127.0.0.1:27017/trademe`. The `trademe` database will be created automatically by Mongoose when the first data is inserted (e.g., via the `seed` command).

## 🌍 Using the CLI Globally

To make your `trademe-cli` available directly from any command shell, you need to "link" it globally.

1.  **Add Shebang to `commands.js`**:
    Ensure the very first line of your `commands.js` file is:

    ```
    #! /usr/bin/env node

    ```

    This line tells Unix-like systems (Linux, macOS, Git Bash on Windows) to execute the script using Node.js.

2.  **Configure `package.json`**:
    Make sure your `package.json` has the `bin` field pointing to your `commands.js` file:

    ```
    {
      "name": "trademe-cli",
      "version": "1.0.0",
      "description": "A CLI tool for managing Trademe listings.",
      "main": "index.js",
      "preferGlobal": true,
      "bin": "./commands.js",  <-- Ensure this line is present and correct
      "scripts": {
        "dev": "nodemon script.js"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "type": "commonjs",
      "dependencies": {
        "chalk": "^5.4.1",
        "commander": "^14.0.0",
        "inquirer": "^12.6.3",
        "mongoose": "^8.15.2",
        "nodemon": "^3.1.10"
      }
    }

    ```

3.  **Create a Global Symlink**:
    Open your terminal **in the project's root directory** (`trademe-cli` folder) and run:

    ```
    npm link

    ```

    This command creates a symlink (shortcut) in your global npm executable directory that points to your `commands.js` file. On Windows, `npm link` typically creates a `.cmd` or `.ps1` wrapper file to ensure Node.js executes the script.

    * **If you encounter issues on Windows** (like being asked "What software to open the file with?"), ensure you've done the `npm link` step and try running your terminal as an Administrator.

4.  **Test Global Command**:
    Close your current terminal window and open a **new one**. Now, you should be able to run your CLI from any directory:

    ```
    trademe-cli --version

    ```

    You should see `1.0.0` printed.

    If you ever need to remove the global link, run `npm unlink` from the project's root directory.

## 💻 Available Commands

Here are the commands you can use with the `trademe-cli`:

* **Display Version:**

    ```
    trademe-cli --version
    # or
    trademe-cli -V

    ```

* **Display Help:**

    ```
    trademe-cli --help
    # or
    trademe-cli -h

    ```

    To see help for a specific command (e.g., `create`):

    ```
    trademe-cli create --help

    ```

* **`seed` - Seed Database with Dummy Data:**
    Deletes all existing listings and populates the database with 30 dummy listings.

    ```
    trademe-cli seed

    ```

* **`create` - Create a New Listing (Interactive):**
    Prompts you for the title, description, starting price, and reserve price.

    ```
    trademe-cli create

    ```

* **`find-by-id <id>` - Find Listing by ID:**
    Retrieves a single listing by its unique MongoDB ID.

    ```
    trademe-cli find-by-id <YOUR_LISTING_ID>
    # Example: trademe-cli find-by-id 65c9e2b1d3f4a5c6b7e8d9f0

    ```

* **`find-by-title <title>` - Find Listings by Title:**
    Searches for listings matching the provided title (case-insensitive).

    ```
    trademe-cli find-by-title "Vintage Leather Journal"

    ```

* **`find-by-keyword <keyword>` - Find Listings by Keyword:**
    Searches for listings where the keyword appears in either the title or description (case-insensitive).

    ```
    trademe-cli find-by-keyword "book"

    ```

* **`update <id>` - Update an Existing Listing (Interactive):**
    Prompts you to update specific fields (title, description, prices) for a listing identified by its ID. It will pre-fill with current values.

    ```
    trademe-cli update <YOUR_LISTING_ID>
    # Example: trademe-cli update 65c9e2b1d3f4a5c6b7e8d9f0

    ```

* **`delete-by-id <id>` - Delete Listing by ID:**
    Deletes a single listing matching the provided ID.

    ```
    trademe-cli delete-by-id <YOUR_LISTING_ID>

    ```

* **`delete-all` - Delete All Listings (with Confirmation):**
    **USE WITH EXTREME CAUTION!** Deletes every listing in the database after a confirmation prompt.

    ```
    trademe-cli delete-all

    ```




