import React from 'react'
import Select from 'react-select'
import Form from 'react-bootstrap/Form';

//Picture select for profile pictures (could be generalized too if we want to pass the pictures)
const PictureSelect = ({pfp, setPfp, size}) => {
    
    const pictures = [
    { value:1, image: 'pfp1' },
    { value:2, image: 'pfp2' },
    { value:3, image: 'pfp3' },
    { value:4, image: 'pfp4' },
    { value:5, image: 'pfp5' },
    { value:6, image: 'pfp6' },
    { value:7, image: 'pfp7' },
    { value:8, image: 'pfp8' },
    { value:9, image: 'pfp9' },
  ];
  
 
  return (
    <>  
        <div>
        <Form.Group>
          <Form.Label>Profile Picture</Form.Label>
            <Select
            // defaultInputValue={"Pick An Image"}
            id='profile-select'
            value={pfp}
            onChange={(value) => setPfp(value)}
            options={pictures}
            formatOptionLabel={picture => (
                <div className="picture-option">
                    <img src={`/${picture.image}.jpg`} alt="profile-picture-image" height={size | 48}/>
                </div>
            )}
            />  
            </Form.Group>
        </div>
    </>
  )
}

export default PictureSelect
