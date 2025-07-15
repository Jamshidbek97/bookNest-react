import { Container } from "@mui/material";
import React from "react";

export default function Location() {
  return (
    <Container maxWidth={false} style={{ padding: 0 }}>
      <div className="location-frame">
        <div className="location-title">Our Location</div>
        <div className="location-content">
          <div className="location-map">
            <iframe
              src="https://maps.google.com/maps?q=Incheon+Korea&t=&z=13&ie=UTF8&iwloc=&output=embed"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </Container>
  );
}
