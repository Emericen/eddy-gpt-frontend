import * as React from "react";
import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Copyright from "./copyright";
import { Button, CircularProgress } from "@mui/material";
import { getNumber, generate } from "./utils";

class App extends React.Component {
  state = {
    prompt: "",
    generated: "",
    loading: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());

    this.setState({
      loading: true,
    });
    generate(data)
      .then((response) => {
        console.log(response);
        this.setState({ generated: response.output });
      })
      .catch((err) => {
        this.setState({ generated: "ERROR: unable to generate" });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render = () => {
    return (
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Eddy's GPT - 1.55B Parameter
          </Typography>
          <br />
          <form onSubmit={this.handleSubmit}>
            <Grid container>
              <Grid item sm={12} style={{ marginBottom: "30px" }}>
                <TextField
                  label="Prompt"
                  name="prompt"
                  multiline
                  rows={15}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid
                container
                alignItems="center"
                style={{ marginBottom: "30px" }}
              >
                <Grid item>
                  <TextField
                    id="outlined-number"
                    label="Token Number"
                    name="tokens"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    defaultValue={50}
                    disabled={this.state.loading}
                    style={{ height: "50px", margin: "0px 20px 0px 0px" }}
                  />
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    disabled={this.state.loading}
                    style={{ height: "50px", margin: "0px 20px 0px 0px" }}
                  >
                    SUBMIT
                  </Button>
                </Grid>

                {!this.state.loading ? (
                  <></>
                ) : (
                  <Grid item>
                    <CircularProgress style={{ margin: "0px 20px" }} />
                  </Grid>
                )}
              </Grid>

              <Grid item sm={12}>
                <Typography variant="body1" component="div" gutterBottom>
                  {this.state.generated}
                </Typography>
              </Grid>
            </Grid>
          </form>
          <br />
          <Copyright />
        </Box>
      </Container>
    );
  };
}

export default App;
