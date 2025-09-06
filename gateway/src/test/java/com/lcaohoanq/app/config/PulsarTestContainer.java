package com.lcaohoanq.app.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.testcontainers.containers.PulsarContainer;
import org.testcontainers.containers.output.Slf4jLogConsumer;
import org.testcontainers.utility.DockerImageName;

public class PulsarTestContainer implements InitializingBean, DisposableBean {

    private PulsarContainer pulsarContainer;
    private static final Logger LOG = LoggerFactory.getLogger(PulsarTestContainer.class);

    @Override
    public void destroy() {
        if (null != pulsarContainer && pulsarContainer.isRunning()) {
            pulsarContainer.close();
        }
    }

    @Override
    public void afterPropertiesSet() {
        if (null == pulsarContainer) {
            pulsarContainer = new PulsarContainer(DockerImageName.parse("apachepulsar/pulsar:4.0.4"))
                .withLogConsumer(new Slf4jLogConsumer(LOG))
                .withReuse(true);
        }
        if (!pulsarContainer.isRunning()) {
            pulsarContainer.start();
        }
    }

    public PulsarContainer getPulsarContainer() {
        return pulsarContainer;
    }
}
