import React from 'react';

export default function AdditionalFeatures(props) {
    return (
        <div className={`additional-features${props.sectionVisibility ? "" : " hidden"}`}>
            {props.features.map((feature, i) => {
                return (
                    <p className="additional-feature" key={i}>
                        {`- ${feature.name}${feature.value ? `: ${feature.value}`: ""}`}
                    </p>
                );
            })}
        </div>
    );
}
