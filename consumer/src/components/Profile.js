import { withAuth0 } from '@auth0/auth0-react';

import axios from 'axios';
import React, { Component } from 'react'
import { Card, Button, Row, Form, FormControl } from 'react-bootstrap';
import Header from './Header';
import './style.css';

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      API: process.env.REACT_APP_API,
      productData: [],
      name: '',
      slug: '',
      showForm: false
    }
  }
  componentDidMount = async () => {
    const getRequest = await axios.get(`${this.state.API}/products/Favorite`);
    this.setState({
      productData: getRequest.data
    })

  }
  deleteData = async (slug) => {
    const deleteRequest = await axios.delete(`${this.state.API}/products/Favorite/${slug}`);
    this.setState({
      productData: deleteRequest.data
    })
  }
  updateSlug = async (e, slug) => {
    e.preventDefault();
    
    this.setState({
      slug: slug,
      showForm: true
    })    
  }
  updateName = async (e) => {
    e.preventDefault();
    
    this.state = {
      name: e.target.value
    }
    console.log('update Target', e.target.value);
    
  }
  updateData = async (e) => {
    e.preventDefault();
    const body = {
      name: this.state.name
    }
    console.log('update LiNE: 71', this.state.slug);
    
    const updateRequest = await axios.put(`http://localhost:8088/products/Favorite/${this.state.slug}`, body);
    this.setState({
      productData: updateRequest.data
    })
  }
  imagePopUp = (e) => {
    // Get the modal
    var modal = document.getElementById("myModal");
    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var modalImg = document.getElementById("modal-img");
    var captionText = document.getElementById("caption");
    document.addEventListener("click", (e) => {
      const elem = e.target;
      if (elem.id === "myImg") {
        modal.style.display = "block";
        modalImg.src = elem.dataset.biggerSrc || elem.src;
        captionText.innerHTML = elem.alt;
      }
    })
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    }
  }
  addComment = async (e,slug) => {
    e.preventDefault();
    const body={
      slug:slug,
      comment:this.state.comment
    }
    await axios.post(`${this.state.API}/products/Favorite/${slug}`, body);
  }
  updateComment=(e)=>{
    this.setState({
      comment:e.target.value
    })
  }
  render() {
    const rendering = <Row xs={1} md={4} className="g-3" >
      {
        this.state.productData.map((data, idx) => {
          return (
            <div key={idx}>
              <Card style={{ width: '18rem', height: '40rem' }}>
                <Card.Img variant="top" src={data.img} id="myImg" class="img-fluid"
                  data-bigger-src={data.img} alt='' onClick={(e) => { this.imagePopUp(e) }} />
                <div id="myModal" class="modal">
                  <span class="close">&times;</span>
                  <img id="modal-img" class="modal-content" alt='' src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQS2ol73JZj6-IqypxPZXYS3rRiPwKteoD8vezk9QsRdkjt3jEn&usqp=CAU" />
                  <div id="caption"></div>
                </div>
                <Card.Body>
                  <Card.Title>{data.name}</Card.Title>
                  <Card.Subtitle>{data.colour}</Card.Subtitle>
                  <Card.Footer>{data.price}</Card.Footer>
                  <>
                    {data.comments.map((comment, idx) => {
                       return(comment != null &&
                        <Card.Subtitle>{comment}</Card.Subtitle>)})}
                  </>
                  <Form onSubmit={(e) => this.addComment(e,data.slug)}>
                    <FormControl onChange={(e) => this.updateComment(e)} type='text' />
                    <Button variant="primary" type='submit' value='Update'>Add Comment</Button>
                  </Form>
                  <Button variant="danger" onClick={() => this.deleteData(data.slug)}>Delete</Button>
                  <Button variant="primary" onClick={(e) => this.updateSlug(e, data.slug)}>Update This</Button>
                </Card.Body>
              </Card>
              <br />
            </div>
          )
        })
      }
    </Row>
    return (
      <div>
        {this.state.showForm &&
          <Form onSubmit={(e) => this.updateData(e)} style={{position:'relative'}}>
            <FormControl onChange={() => this.updateName} type='text' />
            <Button variant="primary" type='submit' value='Update'>Update</Button>
          </Form>
        }
        <Header/>
        {rendering}
      </div>
    )
  }
}

export default withAuth0(Profile)