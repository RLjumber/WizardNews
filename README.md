# WizardNews

I tried adding a link to the stylesheet within the rendered html inside the app.get "/" route, so that i could utilize the classNames i added to the post titles however it is not working, probably something simply but im signing off for now! Good luck.

I think the files in the public folder are initially inaccessible to express without the use of static routing (8.2), which I've added.
The docs on static routing seems important -  it allows us to set up a generic/static url route to a folder (in this case public) so that we can serve up and get whatever we want from that folder, without having to write a unique route for each. 

Also in regards to the styling sheet, it was missing a closing '/' at the end, it still wouldn't have worked since static routing wasn't implented yet though. 