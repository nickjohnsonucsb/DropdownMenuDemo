# Dropdown Menu Component - Nicolas Johnson
**Uses react, tailwind css**
### Live deployment:
**Deployed live using AWS S3's static web hosting, [http://nickinputtestapp.s3-website-us-west-2.amazonaws.com/](http://nickinputtestapp.s3-website-us-west-2.amazonaws.com/)**
### To run:
- Need Node.js and npm.
- In your terminal, please run:
  - `git clone https://github.com/nickjohnsonucsb/DropdownMenuDemo.git`
  - `cd DropdownMenuDemo`
  - `npm ci`
  - `npm run start`
 - On your web browser, navigate to `localhost:3000`

### [DropdownMenu component](./src/DropdwonMenu.js):

**Props:**
```
DropdownMenu.propTypes = {
  id: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  settings: PropTypes.shape({
    isMultiSelect: PropTypes.bool.isRequired,
    variant: PropTypes.oneOf(['long', 'normal'])
  }).isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
};
```
### Example:
```
import DropdownMenu from "./DropdownMenu";
import {countries} from "./Countries";

const multiSelectSettings = {
  isMultiSelect: true,
  variant: 'long',
};

function App() {
  return (
    <>

      <DropdownMenu
                id="multi-select-dropdown"
                options={countries}
                settings={multiSelectSettings}
                label={"Multi-Select:"}
                onChange={(inputValues) => {
                  console.log('Selected Values': + inputValues.toString());
                }}
       />
    </>
  );
}

export default App;

```
