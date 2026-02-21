interface Section {
  title: string;
  text: string;
}

const RightPanel = ({ title, sections }: { title: string; sections: Section[] }) => {
  return (
    <div>
      <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">{title}</h3>
      <div className="space-y-4">
        {sections.map((s, i) => (
          <div key={i}>
            <h4 className="text-sm font-semibold text-foreground mb-1">{s.title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightPanel;
