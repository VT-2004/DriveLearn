import { Check, Circle } from 'lucide-react';
import './ProgressStepper.css';

export default function ProgressStepper({ stages, currentStageIndex }) {
  return (
    <div className="progress-stepper-container">
      <div className="stepper-track-line">
        <div 
          className="stepper-fill-line" 
          style={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
        ></div>
      </div>

      <div className="stepper-stages-list">
        {stages.map((stage, idx) => {
          const isCompleted = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;
          const isUpcoming = idx > currentStageIndex;

          return (
            <div 
              key={stage.id} 
              className={`stepper-node ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${isUpcoming ? 'upcoming' : ''}`}
            >
              <div className="node-icon-bubble">
                {isCompleted ? (
                  <Check size={14} strokeWidth={3} />
                ) : isCurrent ? (
                  <div className="pulsing-inner-dot"></div>
                ) : (
                  <span className="node-number tabular-nums">{idx + 1}</span>
                )}
              </div>

              <div className="node-meta-text">
                <strong className="node-title">{stage.title}</strong>
                <span className="node-desc">{stage.desc}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
