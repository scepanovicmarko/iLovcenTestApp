package com.lovcen.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A FieldGroup.
 */
@Entity
@Table(name = "field_group")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FieldGroup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "value")
    private String value;

    @ManyToOne
    @JsonIgnoreProperties("fieldGroups")
    private Policy policy;

    @OneToMany(mappedBy = "fieldGroup")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Field> fields = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public FieldGroup name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public FieldGroup value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Policy getPolicy() {
        return policy;
    }

    public FieldGroup policy(Policy policy) {
        this.policy = policy;
        return this;
    }

    public void setPolicy(Policy policy) {
        this.policy = policy;
    }

    public Set<Field> getFields() {
        return fields;
    }

    public FieldGroup fields(Set<Field> fields) {
        this.fields = fields;
        return this;
    }

    public FieldGroup addFields(Field field) {
        this.fields.add(field);
        field.setFieldGroup(this);
        return this;
    }

    public FieldGroup removeFields(Field field) {
        this.fields.remove(field);
        field.setFieldGroup(null);
        return this;
    }

    public void setFields(Set<Field> fields) {
        this.fields = fields;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FieldGroup)) {
            return false;
        }
        return id != null && id.equals(((FieldGroup) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "FieldGroup{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", value='" + getValue() + "'" +
            "}";
    }
}
