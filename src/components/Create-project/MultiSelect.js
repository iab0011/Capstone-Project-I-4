import React from 'react'
import Select from 'react-select'

const options=[
    {label:'John Doe jtd1234', value:'john doe'},
    {label:'Mary Sue mjs5123', value:'mary sue'},
    {label:'Sam McDonald snd2331', value:'sam mcdonald'},
]
// put student names from database here ^

function MultiSelect(props){
 //console.log("this is handle props", handleOnChange)
    return <div>
        <Select
        isMulti 
        options={options}
        onChange={props.onChange}
        />
    </div>
}

export default MultiSelect;