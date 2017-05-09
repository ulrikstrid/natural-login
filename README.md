# Natural login

This is the repo for a task to create a login screen with a decent UX and the following requirements:

* E-mail is used to identify user
* We should help the user to not make a typo in the E-mail
  * user@gnail.com -> user@gmail.com
  * usergmail.com -> user@gmail.com
* We should visually show the user when they are doing a misstake
* Prevent user from clicking “Submit” button with wrong email

## Notes
I used create-react-app as react is my framework of choice and it is a quick way to get up and running.

I opted to write my validations and helper functions on my own instead of using libs. I know that they are naive implementations but instead of just stringing libs together I figured I would actually write code.

I took some liberty with the with the last requirement and added a “popup” with suggestions on what the email field should have been.

I went for 100% coverage in the model and slacked off a bit on the components. I could have introduced redux and then use props for everything for better testability but it felt like too much.

## Run the project
To run the project locally just use the following command: `yarn run start`.

To run the tests use `yarn run test`.

You can also reach the project at [Github pages](https://ulrikstrid.github.io/natural-login).
