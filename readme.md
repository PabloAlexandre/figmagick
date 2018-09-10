# Figmagick

Figmagick is a tool to help developers and designers in the process of keep the design tokens up to date. We use the FigmaAPI to extract the design tokens and export as JSON file to your source code. 

We're aiming this flow: 

- The designer create a figma document with all tokens
- The developer use the figmagick theme structure to create a frontend application
- The designer update some tokens with new styles
- The developer just need run the figmagick command and voilá, all tokens are up to dated in application

## Usage

### For Designers

Figmagick tries to use Figma Styles in most cases. But in some scenarios, we cannot depend of styles, like `Spacing` case. So, with this constrain, you need to create a `Group` or a `Frame` containing all tokens of your design system. Choice a good name for this element, the developer will need it in front end setup.

Figmagick for now have support for this tokens:

| Style | Style support | Multiple Support*
| --- | --- | --- |
| Color | `Solid Colors` and `Linear Gradient` | No 
| Font Styles | `Font Size`, `Font Family`, `Font Weight`, `Line Height` and `Letter Spacing` | - 
| Effects | `Inner Shadow` and `Drop Shadow` | Yes 
| Spacing | - | -

** _In Figma you can set more than one color or effect in a saved pattern. We just cover now  multiple Effects in generated theme._

#### Note about Spaces
Spaces are not covered in figma style library, so to we include space definition in generated theme, we need to create a rectangle element where `width` and `height` are your spacement definition. To figmagick find this elements, you need to put this rectangles in a Group with a semantic name (We recommended to call this group as `Spaces`) and name every element as a clear token name, thus helping to keep consistency of your tokens in generated theme.


[If you would like to see an example, we have a document with an example of how organize your tokens in figma.](https://www.figma.com/file/aVfmAwky9Y8n6hXp71dDQJnV/DS-Tests?node-id=0%3A1)


![Figma example](https://s3-alpha.figma.com/thumbnails/c53291c6-9ea1-4772-94d8-356ef8b3a948)


### For Devs
To setup **Figmagick** in your application, install the cli via npm.

```
npm install -g figmagick-cli
```

After install, create a figmagick configuration file in root of your project. Name it as `figmagick.config.json`.

```json
{
  "fileId": "the id of figma document",
  "outPath": "./path/of/your/theme.json",
  "tokenEntry": "The name of element in figma with all design token definitions",
  "spaceGroup": "The name of spacing definition group"
}
```

** _If you have doubts about `tokenEntry` and `spaceGroup` names, ask to designer about this informations. It's necessary to generate a theme file._

For last, you need to setup your `FIGMA_TOKEN` to authorize figma to read informations about document. **We don't save this information, we just use to extract tokens**. 

To setup you can pass this token as environment variable:

```
FIGMA_TOKEN=your-token figmagick
```

Or you can setup a .env file in root of your project if you prefer.
**Don't commit this .env file in your public repository**

```
FIGMA_TOKEN=your-token
```

[You can read about how to get your token here](https://www.figma.com/developers/docs#auth)

After setup this, you just need to run this command to update your theme.

```
figmagick
```

#### Using in Javascript Frontend applications

We have a package to help you to integrate your tokens in a front end application.


## Contributing

