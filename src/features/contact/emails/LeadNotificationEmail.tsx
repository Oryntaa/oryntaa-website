import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

export interface LeadNotificationProps {
  route: string;
  fullName: string;
  email: string;
  company: string | undefined;
  country: string | undefined;
  services: string[];
  stage: string | undefined;
  timeline: string | undefined;
  budget: string | undefined;
  message: string;
  sourcePath: string | undefined;
}

const labelStyle = {
  margin: '0',
  fontSize: '12px',
  color: '#78716c',
  textTransform: 'uppercase' as const,
};
const valueStyle = { margin: '2px 0 12px', fontSize: '15px', color: '#1c1917' };

function Field({ label, value }: { label: string; value: string }): React.JSX.Element {
  return (
    <Section>
      <Text style={labelStyle}>{label}</Text>
      <Text style={valueStyle}>{value}</Text>
    </Section>
  );
}

/** Lead notification email sent to the founding team on each submission (API_ARCHITECTURE §7). */
export function LeadNotificationEmail(props: LeadNotificationProps): React.JSX.Element {
  const {
    route,
    fullName,
    email,
    company,
    country,
    services,
    stage,
    timeline,
    budget,
    message,
    sourcePath,
  } = props;

  return (
    <Html>
      <Head />
      <Preview>{`New ${route} lead from ${fullName}`}</Preview>
      <Body
        style={{ backgroundColor: '#fafaf9', fontFamily: 'Arial, sans-serif', padding: '24px' }}
      >
        <Container
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '560px',
          }}
        >
          <Heading style={{ fontSize: '20px', color: '#1c1917', margin: '0 0 4px' }}>
            New lead — {route}
          </Heading>
          <Text style={{ fontSize: '14px', color: '#78716c', margin: '0 0 20px' }}>
            {fullName} · {email}
          </Text>
          <Hr style={{ borderColor: '#e7e5e4' }} />
          {company !== undefined && company !== '' ? (
            <Field label="Company" value={company} />
          ) : null}
          {country !== undefined && country !== '' ? (
            <Field label="Country" value={country} />
          ) : null}
          {services.length > 0 ? <Field label="Services" value={services.join(', ')} /> : null}
          {stage !== undefined ? <Field label="Stage" value={stage} /> : null}
          {timeline !== undefined ? <Field label="Timeline" value={timeline} /> : null}
          {budget !== undefined ? <Field label="Budget" value={budget} /> : null}
          <Field label="Message" value={message} />
          {sourcePath !== undefined ? <Field label="Source" value={sourcePath} /> : null}
        </Container>
      </Body>
    </Html>
  );
}
