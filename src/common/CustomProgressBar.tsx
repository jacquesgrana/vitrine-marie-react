import React from 'react';

type ProgressBarProps = {
  value: number; // valeur courante (0-100)
  //label?: string; // texte optionnel à afficher dans la barre
};

const ProgressBar: React.FC<ProgressBarProps> = ({ value}) => (
  <div className="progress custom-progress">
    <div
      className={`progress-bar custom-progress-bar`}
      role="progressbar"
      style={{ width: `${value}%` }}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {`${value}%`}
    </div>
  </div>
);

export default ProgressBar;
