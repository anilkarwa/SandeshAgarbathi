import React from 'react';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';

export const CustomerListLoader = () => (
  <ContentLoader backgroundColor="#fff" foregroundColor="#CACFD2">
    <Circle cx="40" cy="50" r="30" />
    <Rect x="90" y="30" rx="4" ry="4" width="50%" height="10" />
    <Rect x="90" y="50" rx="3" ry="4" width="40%" height="10" />

    <Circle cx="40" cy="160" r="30" />
    <Rect x="90" y="140" rx="4" ry="4" width="50%" height="10" />
    <Rect x="90" y="160" rx="3" ry="4" width="40%" height="10" />

    <Circle cx="40" cy="270" r="30" />
    <Rect x="90" y="250" rx="4" ry="4" width="50%" height="10" />
    <Rect x="90" y="270" rx="3" ry="4" width="40%" height="10" />

    <Circle cx="40" cy="380" r="30" />
    <Rect x="90" y="360" rx="4" ry="4" width="50%" height="10" />
    <Rect x="90" y="380" rx="3" ry="4" width="40%" height="10" />

    <Circle cx="40" cy="490" r="30" />
    <Rect x="90" y="470" rx="4" ry="4" width="50%" height="10" />
    <Rect x="90" y="490" rx="3" ry="4" width="40%" height="10" />

    <Circle cx="40" cy="600" r="30" />
    <Rect x="90" y="580" rx="4" ry="4" width="50%" height="10" />
    <Rect x="90" y="600" rx="3" ry="4" width="40%" height="10" />
  </ContentLoader>
);
